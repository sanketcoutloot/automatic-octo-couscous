import React from 'react';
import {
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    FormErrorMessage,
    NumberInput,
    NumberInputField,
    Select,
    Button,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
function AccountDetailsModals() {
    // modal control
    const { isOpen, onOpen, onClose } = useDisclosure();

    //    fom controls
    const { handleSubmit, errors, register, formState } = useForm();

    return (
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Bank Details </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Account Holder name  */}
                        <FormControl isRequired isInvalid={errors.name}>
                            <FormLabel htmlFor="acc_holder_name">
                                Account Holder Name
                            </FormLabel>
                            <Input
                                name="acc_holder_name"
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
                            <FormLabel htmlFor="acc_holder_number">
                                Account Number
                            </FormLabel>
                            <NumberInput name="acc_holder_number">
                                <NumberInputField
                                    placeholder="Account Number"
                                    ref={register({
                                        required: true,
                                    })}
                                />
                            </NumberInput>
                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Accoubt Type */}
                        <FormControl isInvalid={errors.name}>
                            <FormLabel htmlFor="account_type">
                                Account Type
                            </FormLabel>
                            <Select
                                name="account_type"
                                placeholder="Account Type"
                                ref={register({
                                    required: true,
                                })}
                            >
                                <option value="Saving Account">
                                    Saving Account
                                </option>
                                <option value="Current Account">
                                    Current Account
                                </option>
                                <option value="UPI">UPI</option>
                            </Select>

                            <FormErrorMessage>
                                {errors.name && errors.name.message}
                            </FormErrorMessage>
                        </FormControl>

                        {/* Bank Name  */}
                        <FormControl isRequired isInvalid={errors.name}>
                            <FormLabel htmlFor="bank_name">Bank Name</FormLabel>
                            <Input
                                name="bank_name"
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
                            <FormLabel htmlFor="ifsc">IFSC code</FormLabel>
                            <Input
                                name="ifsc"
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

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default AccountDetailsModals;
