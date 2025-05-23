
import Box from '@mui/material/Box';
import UOMList from './UOMList/UOMList';
import HotoHeader from 'app/Components/HotoHeader';

const UOM = () => {
    return (
      <Box>
        <HotoHeader/>
        <UOMList />
      </Box>
    );
}

export default UOM;