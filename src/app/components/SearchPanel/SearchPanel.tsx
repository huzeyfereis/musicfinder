import { Box, Button, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../hooks/useTypedSelector';
import { fetchData } from '../../../features/searchSlice';
import { searchActions } from '../../../features/searchSlice';

const SearchPanel: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const { fetchDataRequest } = searchActions;

  const getSearchQuery = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const makeSearch = () => {
    const encodedQueryTerm = encodeURI(searchQuery).replace(/%20/g, '+');
    dispatch(fetchDataRequest(encodedQueryTerm));
    dispatch(fetchData(encodedQueryTerm));
  };

  const pressEnterSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.length > 0) {
      makeSearch();
    }
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
      marginTop={'1rem'}
    >
      <TextField
        id='outlined-basic'
        label='Artist, Album, Song name'
        variant='outlined'
        onChange={getSearchQuery}
        onKeyPress={pressEnterSearch}
      />
      <Button onClick={makeSearch} sx={{ height: '56px' }} variant='outlined'>
        Search
      </Button>
    </Box>
  );
};

export default SearchPanel;
