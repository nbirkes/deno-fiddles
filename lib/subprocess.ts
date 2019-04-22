async function main() {
  const decoder = new TextDecoder();

  const fileNames = Deno.args.slice(1);

  console.log(fileNames);

  const p = Deno.run({
    args: [
      "deno",
      "--allow-read",
      "https://deno.land/std/examples/cat.ts",
      ...fileNames
    ],
    stdout: "piped",
    stderr: "piped"
  });

  const { code } = await p.status();

  console.log(code);

  if (code === 0) {
    const rawOutput = await p.output();
    Deno.stdout.write(rawOutput);
  } else {
    const rawError = await p.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    console.log(errorString);
  }

  Deno.exit(code);
}

main();
