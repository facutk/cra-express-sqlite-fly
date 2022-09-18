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
  const handleNewCustomer = () => {
    console.log('click - new customer!');
  };

  const handleNewJob = () => {
    console.log('click - new job!');
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
