import { FC } from 'react';
import { Box, Paper } from '@mui/material';
import ResultItem from './components/ResultItem';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../hooks/useTypedSelector';
import Loading from '../Loading';
import NotFound from '../NotFound';
import useFetchMoreData from '../../../hooks/useFetchMoreData';
import { fetchMoreData } from '../../../features/searchSlice';

const ResultList: FC = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);
  const { data, isLoading, isFetched } = searchState;

  useFetchMoreData(() => {
    if (isFetched && data.length > 0) dispatch(fetchMoreData(searchState));
  });

  const notFound = isFetched && !isLoading && !data.length;

  if (notFound) {
    return (
      <Box width={'800px'} margin={'1rem auto'}>
        <Paper sx={{ padding: '1rem' }} elevation={3}>
          <NotFound />
        </Paper>
      </Box>
    );
  }

  return (
    <>
      {isLoading && <Loading />}{' '}
      {data && (
        <Box width={800} sx={{ margin: '2rem auto' }}>
          {data.map((item, index) => (
            <ResultItem
              key={item.trackId}
              index={index}
              artistName={item.artistName}
              trackId={item.trackId}
              trackImageUrl={item.trackImageUrl}
              trackName={item.trackName}
              trackPrice={item.trackPrice}
              currency={item.currency}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default ResultList;
