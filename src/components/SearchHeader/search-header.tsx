import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchHeader = () => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
        <FormControl sx={{ m: 1, width: '100%', }}>
          <OutlinedInput
            sx={{ backgroundColor: '#1b1b25', color: '#fff', padding: '0 1.5em', borderRadius: '2em',  height: 40 }}
            placeholder="Search tracks, albums,..."
            id="outlined-adornment-amount"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#fff', fontSize: 20 }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  );
};

export default SearchHeader;
