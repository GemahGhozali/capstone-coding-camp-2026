import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import NoteIcon from "@/assets/icons/NoteIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import PlusIcon from "@/assets/icons/PlusIcon";

interface ReferenceInputItemProps {
  index: number;
  isLast: boolean;
  error?: string;
  onAdd: () => void;
  onDelete: (index: number) => void;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function ReferenceInputItem({ index, isLast, error, onAdd, onDelete, inputProps }: ReferenceInputItemProps) {
  return (
    <div className="flex gap-4">
      <Input
        placeholder={`Tuliskan referensi jawaban ke-${index + 1} disini...`}
        icon={<NoteIcon className="size-5 text-neutral-500" />}
        className="grow"
        error={error}
        {...inputProps}
      />
      {isLast ? (
        <Button
          icon={<PlusIcon className="size-5 fill-white" />}
          iconPosition="only"
          size="large"
          color="black"
          onClick={onAdd}
          type="button"
          className="shrink-0"
          disabled={inputProps.disabled}
        />
      ) : (
        <Button
          icon={<DeleteIcon className="size-5 fill-white" />}
          iconPosition="only"
          size="large"
          color="red"
          type="button"
          onClick={() => onDelete(index)}
          className="shrink-0"
          disabled={inputProps.disabled}
        />
      )}
    </div>
  );
}
