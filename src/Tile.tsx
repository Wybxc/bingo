export interface TileProps {
  content: string;
  class: string;
  setContent: (value: string) => void;
}

function Tile(props: TileProps) {
  let textareaRef!: HTMLTextAreaElement;

  return (
    <div class={props.class}>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: Focus */}
      <div
        class="h-full flex flex-row items-center"
        onClick={() => textareaRef.focus()}
      >
        <div class="relative w-full">
          <div class="text-center invisible min-h-4">{props.content}</div>
          <div class="absolute inset-0">
            <textarea
              class="resize-none w-full h-full min-h-4 bg-transparent text-center focus:outline-none focus:ring-0 overflow-hidden"
              value={props.content}
              onInput={(e) => props.setContent(e.currentTarget.value)}
              ref={textareaRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
