function Button(props: { text: string; onClick: () => void }) {
  return (
    <button
      type="button"
      class="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors rounded"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
