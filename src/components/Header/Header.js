import {
  Box,
  Button,
  Flex,
  Stack,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsSunFill, BsMoonFill } from 'react-icons/bs';

import NewActions from './NewActions';
import ProfileMenu from './ProfileMenu';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <NewActions />
        </Box>

        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <BsMoonFill /> : <BsSunFill />}
            </Button>

            <ProfileMenu />
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
