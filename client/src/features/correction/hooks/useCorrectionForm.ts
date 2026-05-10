import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { correctionSchema, type CorrectionFormValues } from "../schemas/correction.schema";

interface UseCorrectionFormProps {
  defaultValues?: CorrectionFormValues;
  submitFn: (data: CorrectionFormValues) => void;
}

export default function useCorrectionForm({ defaultValues, submitFn }: UseCorrectionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<CorrectionFormValues>({
    resolver: zodResolver(correctionSchema),
    defaultValues: defaultValues ?? {
      question: "",
      answerReferences: [{ value: "" }],
      gradedAnswer: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "answerReferences" });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues?.question]);

  return {
    register,
    control,
    errors,
    fields,
    append,
    remove,
    onSubmit: handleSubmit(submitFn),
  };
}
