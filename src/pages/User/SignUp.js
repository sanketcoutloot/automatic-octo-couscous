import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import React from "react";
import SignUpForm from "./SignUpForm";

const Signup = ({ isOpen, onClose }) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <h1>New User </h1>
        </DrawerHeader>
        <DrawerBody>
          <SignUpForm />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Signup;
