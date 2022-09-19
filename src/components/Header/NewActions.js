import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { BsPlusLg } from 'react-icons/bs';
import { MdAddTask } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';

const NewActions = () => {
  const handleNewCustomer = async () => {
    const result = await fetch('/create-user', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        name: 'John Doe',
        jobs: [],
      }),
    });
    console.log('click - new customer!', { result });
  };

  const handleNewJob = async () => {
    const result = await fetch('/create-job');
    console.log('click - new job!', result);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsPlusLg />}
        variant="outline"
      />
      <MenuList>
        <MenuItem
          icon={<BiUserPlus />}
          command="⌘C"
          onClick={handleNewCustomer}>
          New Customer
        </MenuItem>
        <MenuItem icon={<MdAddTask />} command="⌘J" onClick={handleNewJob}>
          New Job
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NewActions;
