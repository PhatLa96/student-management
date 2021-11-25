import { Box, Button, CircularProgress } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { InputFields, RadioGroupFields, SelectFields } from 'components/FormFields';
import { selectCityOption } from 'features/city/citySlice';
import { Student } from 'models';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (fromValues: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('Please enter name')

      // có 2 từ
      .test('tow-words', 'Please enter at least two words', (value) => {
        if (!value) return true;

        const parts = value?.split(' ') || [];

        //filter ra những cái nào khác rỗng
        return parts.filter((x) => Boolean(x))?.length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number')
      .integer('Please enter an integer')
      .required('Please enter age')
      .typeError('Please enter a valid number')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60'),
    mark: yup
      .number()
      .positive('Please enter a positive number')
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter age')
      .typeError('Please enter a valid number'),
    gender: yup.string().oneOf(['male', 'female'], 'Please select either male or female'),
    city: yup.string().required('Please select city'),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps): ReactElement {
  const cityOptions = useAppSelector(selectCityOption);
  const [error, setError] = React.useState<string>('');
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError('');
      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form Fields */}
        <InputFields name="name" control={control} label="Full Name" />

        <RadioGroupFields
          name="gender"
          control={control}
          label="Gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <InputFields name="age" control={control} label="Age" type="number" />
        <InputFields name="mark" control={control} label="Mark" type="number" />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectFields name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} color="secondary" />}
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}
