import { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import MoneyOffRoundedIcon from '@mui/icons-material/MoneyOffRounded';
import { IResultItem } from '../../../../features/searchSlice';
import {
  ResultCard,
  TrackImage,
  TrackDetails,
  TrackPrice,
} from './ResultItem.styled';

interface Props extends IResultItem {
  index: number;
}

const ResultItem: FC<Props> = ({ ...props }) => {
  const {
    artistName,
    trackId,
    trackImageUrl,
    trackName,
    trackPrice,
    currency,
    index,
  } = props;
  return (
    <Box sx={{ m: '1rem 0' }}>
      <Paper
        sx={{
          padding: '8px',
          boxSizing: 'border-box',
        }}
        elevation={3}
      >
        <ResultCard key={trackId}>
          <TrackImage src={trackImageUrl} alt='trackImage' />
          <TrackDetails>
            <Typography
              alignItems={'center'}
              fontSize={'small'}
              textAlign={'left'}
            >
              {index + 1} - {artistName}
            </Typography>
            <Typography variant='h6' color={'#b78b1f'} textAlign={'left'}>
              {trackName}
            </Typography>
          </TrackDetails>
          <TrackPrice>
            {trackPrice && trackPrice > 0 ? (
              <>
                <Typography variant='h6'>{trackPrice}</Typography>
                <Typography color={'#b78b1f'} fontSize={'13px'}>
                  {currency}
                </Typography>
              </>
            ) : (
              // if there is no price information showing off dollar icon
              <MoneyOffRoundedIcon fontSize='large' color='error' />
            )}
          </TrackPrice>
        </ResultCard>
      </Paper>
    </Box>
  );
};

export default ResultItem;
