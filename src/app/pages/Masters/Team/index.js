
import Box from '@mui/material/Box';

import TeamList from './TeamList/TeamList';
import HotoHeader from 'app/Components/HotoHeader';

const Team = () => {
    return (
      <Box>
        <HotoHeader />
        <TeamList />
      </Box>
    );
}

export default Team;