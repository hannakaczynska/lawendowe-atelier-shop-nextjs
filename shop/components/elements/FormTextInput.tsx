export default function FormTextInput({
  label,
  id,
  register,
  error,
  disabled,
}: {
  label: string;
  id: string;
  register: any;
  error: any;
  disabled?: boolean;
}) {
  return (
    <>
      <label htmlFor={id} className="text-[var(--grey)] text-sm block mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`p-2 pl-3 w-full border border-[var(--light-grey)] rounded-md ${
          disabled ? "opacity-80 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
        {...register(id)}
      />
      <p className="text-xs text-[var(--out-of-stock)] h-[18px] my-1 md:h-[20px] my-1 md:mb-2">
        {error?.message || " "}
      </p>
    </>
  );
}
