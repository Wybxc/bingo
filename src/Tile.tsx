export interface TileProps {
  content: string;
  class: string;
  setContent: (value: string) => void;
}

function Tile(props: TileProps) {
  return (
    <div class={props.class}>
      <div class="h-full flex flex-row items-center">
        <div class="relative w-full">
          <div class="text-center invisible">{props.content}</div>
          <div class="absolute inset-0">
            <textarea
              class="resize-none w-full h-full bg-transparent text-center focus:outline-none focus:ring-0 overflow-hidden"
              value={props.content}
              onInput={(e) => props.setContent(e.currentTarget.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tile;
