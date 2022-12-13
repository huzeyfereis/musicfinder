import React from 'react';
import { RiseLoader } from 'react-spinners';

import { Loading } from './Loading.styled';

const Loader = React.memo(() => {
  return (
    <Loading>
      <RiseLoader color='#b78b1f' size={30} margin={20} />
    </Loading>
  );
});

export default Loader;
