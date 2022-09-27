import {
  Avatar,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('/auth/logout').then(() => {
      navigate('/login');
    });
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        cursor={'pointer'}
        minW={0}
        rounded={'full'}
        variant={'link'}>
        <Avatar
          size={'sm'}
          src={'https://avatars.dicebear.com/api/male/username.svg'}
        />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar
            size={'2xl'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
          />
        </Center>
        <br />
        <Center>
          <p>Username</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem>Your Servers</MenuItem>
        <MenuItem>Account Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
