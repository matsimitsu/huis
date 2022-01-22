<script>
  import Image from "$lib/components/Image.svelte"

	export let gallery = {};
  const images = gallery.children.map(g => g.blocks).flat()
</script>

<div class="grid grid-cols-3 gap-4 my-8">
  {#each images as image (image.id)}
    <div class="h-96 overflow-hidden">
      <Image image={image.image} className="object-contain h-96 block w-full" />
    </div>
  {/each}
</div>
