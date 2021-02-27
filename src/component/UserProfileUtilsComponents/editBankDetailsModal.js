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
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";
import API from "../../config/API";

const EditBankDetailsModal = ({
  isOpen,
  onClose,
  bankDetails,
  updateBankDetails,
}) => {
  const [isError, setIsError] = useState(undefined);
  const {
    handleSubmit,
    errors,
    reset,
    register,
    formState,
    getValues,
  } = useForm();

  const toast = useToast();

  const submitEditBankDetails = async (updatedBankDetails) => {
    try {
      let { data } = await API.post(`bank/editBankDetails`, updatedBankDetails);
      let { success, data: responseData, errMessage } = data;
      if (success === 1) {
        if (!Array.isArray(responseData)) {
          responseData = new Array(responseData);
        }
        toast({
          title: "Successfully edited Bank Details.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        console.log(" updateBankDetails", responseData[0]);
        onClose();
        updateBankDetails(responseData[0]);
      } else {
        toast({
          title: "Failed to edit Bank Details.",
          description: errMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  //find the

  const onSubmit = async () => {
    let data = getValues();
    let accountId = bankDetails.accountId;
    let payload = { ...data, accountId };
    await submitEditBankDetails(payload);
  };

  useEffect(() => {
    console.log({ bankDetails });
    reset(bankDetails);
  }, [bankDetails]);
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
                ref={register({
                  required: true,
                })}
              >
                <option value="Saving Account">Saving Account</option>
                <option value="Current Account">Current Account</option>
                <option value="UPI">UPI</option>
                <option value="PAYTM">PAYTM</option>
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
