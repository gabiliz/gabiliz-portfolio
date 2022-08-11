import { Box, useMediaQuery } from '@chakra-ui/react'
import { Desktop } from './components/desktop';
import { Mobile } from './components/mobile';

function App() {
  const [isMobile] = useMediaQuery("(max-width: 768px)")
  return (
    <Box>
    {isMobile ? (
      <Mobile />
    ) : (
      <Desktop />
    )}
    </Box>
  )
}

export default App
