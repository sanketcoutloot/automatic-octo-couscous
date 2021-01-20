import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";

const EditBankDetailsModal = ({ isOpen, onClose, bankDetails }) => {
  const {
    handleSubmit,
    errors,
    reset,
    register,
    formState,
    getValues,
  } = useForm();

  const onSubmit = async () => {
    // add Api calls
    setTimeout(() => {
      let data = getValues();
      window.alert(JSON.stringify(data, null, 2));
    }, 3000);
  };

  console.log("bank details ", bankDetails);
  useEffect(() => {
    reset(bankDetails);
  }, []);
  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bank Details </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Account Holder name  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="accountHolderName">
                Account Holder Name
              </FormLabel>
              <Input
                name="accountHolderName"
                placeholder="Account Holder Name "
                ref={register({
                  required: true, // JS only: <p>error message</p> TS only support string
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Account Number  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
              <Input
                name="accountNumber"
                placeholder="Account Number"
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Accoubt Type */}
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="accountType">Account Type</FormLabel>
              <Select
                name="accountType"
                placeholder="Account Type"
                ref={register({
                  required: true,
                })}
              >
                <option value="Saving Account">Saving Account</option>
                <option value="Current Account">Current Account</option>
                <option value="UPI">UPI</option>
              </Select>

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Bank Name  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="bankName">Bank Name</FormLabel>
              <Input
                name="bankName"
                placeholder="Account Holder Name "
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* IFSC CODE  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="ifscCode">IFSC code</FormLabel>
              <Input
                name="ifscCode"
                placeholder="Account Holder Name "
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditBankDetailsModal;
