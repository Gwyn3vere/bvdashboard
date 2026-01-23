export const TWCSS = {
  container: "px-2 pb-2 sm:px-10 sm:pb-5",
  paginationButton: [
    "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
    " hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-light-primary-100)]"
  ],
  list: "p-4 w-full h-full bg-[var(--color-bg-light-primary-100)]",
  tagButton: [
    "px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
    "gap-1 border-1 border-[var(--color-gray-400)]",
    "hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary-700)] hover:border-[var(--color-primary-700)]"
  ],
  tagButtonActive: ["bg-[var(--color-primary)] text-white border-[var(--color-primary)]"],
  input: [
    "flex items-center px-3 rounded-[8px] mt-1",
    "border-2 border-[var(--color-bg-light-primary-400)]",
    "box-border h-[50px]",
    "focus-within:border-2 focus-within:border-[var(--color-primary)]",
    "hover:border-gray-300 transition-colors"
  ],
  select: [
    "w-full px-4 py-3 border-2 rounded-[8px] mt-1",
    "border-[var(--color-bg-light-primary-400)] hover:border-[var(--color-bg-light-primary-500)]",
    "focus:border-[var(--color-primary-500)] focus:outline-none cursor-pointer",
    "flex items-center justify-between bg-white hover:border-gray-300 transition-colors"
  ],
  inputError: ["border-2 border-[var(--color-error)]"],
  scrollbarX: [
    "[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full",
    "[&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:bg-gray-300",
    "dark:[&::-webkit-scrollbar-track]:bg-[var(--color-primary-100)] dark:[&::-webkit-scrollbar-thumb]:bg-[var(--color-primary-300)]"
  ],
  scrollbarY: [
    "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full",
    "[&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full",
    "[&::-webkit-scrollbar-thumb]:bg-gray-300",
    "dark:[&::-webkit-scrollbar-track]:bg-[var(--color-primary-100)] dark:[&::-webkit-scrollbar-thumb]:bg-[var(--color-primary-300)]"
  ]
};
