import { createEffect, createSignal, Index, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { BiLogosGithub } from "solid-icons/bi";
import * as fflate from "fflate";
import Tile from "./Tile";
import ThemeToggle from "./ThemeToggle";
import Button from "./Button";
import { randomBingos } from "./random";

const defaultBingo = {
  title: "自定义 Bingo",
  description: "五个连成一线，说明你完成了一个 Bingo",
  tiles: Array<string>(25).fill(""),
};

function App() {
  const [pageTitle, setPageTitle] = createSignal("自定义 Bingo!");
  const [bingo, setBingo] = createStore(defaultBingo);

  onMount(() => {
    const urlData = new URLSearchParams(window.location.search).get("data");
    if (urlData) {
      fflate.gunzip(fflate.strToU8(atob(urlData), true), (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        localStorage.removeItem("bingo");
        const bingoData = JSON.parse(fflate.strFromU8(data));
        setPageTitle(bingoData.title);
        setBingo(bingoData);
      });
    }

    const data = localStorage.getItem("bingo");
    if (data) {
      setBingo(JSON.parse(data));
    }
  });

  createEffect(() => {
    document.title = pageTitle();
  });

  createEffect(() => {
    localStorage.setItem("bingo", JSON.stringify(bingo));
  });

  const share = () => {
    const title = bingo.title;
    fflate.gzip(fflate.strToU8(JSON.stringify(bingo)), (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const url = new URL(window.location.href);
      url.searchParams.set("data", btoa(fflate.strFromU8(data, true)));
      navigator.share({
        title,
        url: url.toString(),
      });
    });
  };

  const random = () => {
    setBingo("title", "随机 Bingo");
    setBingo("description", "五个连成一线，说明你的经历很丰富！");
    setBingo("tiles", randomBingos(25));
  };

  const clear = () => {
    localStorage.removeItem("bingo");
    window.location.search = "";
  };

  return (
    <main class="w-full bg-gradient-to-r from-purple-200 to-sky-200 dark:bg-none">
      <div class="flex flex-col items-center px-2 sm:px-8 py-4 gap-4 w-full min-h-lvh sm:w-[32rem] md:w-[36rem] lg:w-[40rem] mx-auto shadow-2xl bg-white dark:bg-gray-900">
        <header>
          <h1 class="text-3xl font-bold">{pageTitle()}</h1>
        </header>

        <div class="flex gap-2 text-3xl">
          <a href="https://github.com/Wybxc/bingo" class="inline-block">
            <BiLogosGithub />
          </a>
          <div class="inline-block">
            <ThemeToggle />
          </div>
        </div>

        <p>↓ 点击文字，修改内容 ↓</p>

        <div class="px-4 place-self-stretch text-sm md:text-base">
          <div class="border-l-2 border-r-2 border-black dark:border-gray-50 w-full">
            <Tile
              class="border-t-2 border-black dark:border-gray-50 text-2xl font-bold py-4"
              content={bingo.title}
              setContent={(value) => setBingo("title", value)}
            />
            <Tile
              class="border-t-2 border-black dark:border-gray-50 text-lg py-2"
              content={bingo.description}
              setContent={(value) => setBingo("description", value)}
            />
          </div>
          <div class="grid grid-cols-5 grid-rows-5 w-full border-l-2 border-t-2 border-black dark:border-gray-50">
            <Index each={bingo.tiles}>
              {(tile, index) => (
                <Tile
                  class="h-20 lg:h-24 border-r-2 border-b-2 border-black dark:border-gray-50"
                  content={tile()}
                  setContent={(value) => setBingo("tiles", index, value)}
                />
              )}
            </Index>
          </div>
        </div>

        <div class="flex gap-2 text-lg">
          <Button text="分享" onClick={share} />
          <Button text="随机" onClick={random} />
          <Button text="清除" onClick={clear} />
        </div>

        <div class="place-self-stretch">
          <p>点击「分享」，创建一个指向此 bingo 的链接</p>
          <p>
            点击「随机」，生成一个随机的 bingo<em>（生草预警）</em>
          </p>
          <p>点击「清除」，清空 bingo</p>
        </div>

        <footer class="text-sm text-gray-600 dark:text-slate-400 text-center">
          <p>
            本项目由{" "}
            <a
              href="https://github.com/Wybxc"
              class="underline"
              target="_blank"
              rel="noreferrer"
            >
              忘忧北萱草
            </a>{" "}
            开发 &copy; {new Date().getFullYear()}
          </p>

          <p>
            由{" "}
            <a
              href="https://www.solidjs.com/"
              class="underline"
              target="_blank"
              rel="noreferrer"
            >
              SolidJS
            </a>{" "}
            和{" "}
            <a
              href="https://tailwindcss.com/"
              class="underline"
              target="_blank"
              rel="noreferrer"
            >
              TailwindCSS
            </a>{" "}
            强力驱动
          </p>
        </footer>
      </div>
    </main>
  );
}

export default App;
