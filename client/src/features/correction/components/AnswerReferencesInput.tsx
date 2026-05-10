import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CorrectionFormValues } from "../schemas/correction.schema";
import AnswerReferencesInputItem from "./AnswerReferencesInputItem";

interface AnswerReferencesInputProps {
  fields: { id: string }[];
  register: UseFormRegister<CorrectionFormValues>;
  errors: FieldErrors<CorrectionFormValues>;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function AnswerReferencesInput({ fields, register, errors, onAdd, onRemove }: AnswerReferencesInputProps) {
  return (
    <div>
      <label className="block mb-1.5 text-body font-semibold">
        Referensi Jawaban <span className="text-red-600">*</span>
      </label>
      <p className="text-caption text-neutral-500 mb-3">Anda bisa menambahkan lebih dari satu referensi jawaban untuk penilaian lebih akurat</p>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <AnswerReferencesInputItem
            key={field.id}
            index={index}
            isLast={index === fields.length - 1}
            error={errors.answerReferences?.[index]?.value?.message}
            onAdd={onAdd}
            onDelete={onRemove}
            inputProps={register(`answerReferences.${index}.value`)}
          />
        ))}
      </div>
    </div>
  );
}
