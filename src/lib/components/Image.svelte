<script>
	import Text from '$lib/components/Text.svelte';
	import { Dialog, DialogOverlay, Transition, TransitionChild } from '@rgossiaux/svelte-headlessui';

	export let image = {};
	export let files = [];
	export let className = '';

	const imageWithVariations = files.find(i => i.id == image.id)
	let thumb = "https://cdn.matsimitsu.dev" + (imageWithVariations?.versions?.jpg || {})[480]
	let large =  "https://cdn.matsimitsu.dev" + (imageWithVariations?.versions?.jpg || {})[1200]

	let isOpen = false;
	const setIsOpen = (newIsOpen) => {
		isOpen = newIsOpen;
	};
</script>

<figure>
	<img
		src={thumb}
		alt={image.caption}
		class={className + ' cursor-zoom-in'}
		on:click={() => setIsOpen(true)}
		loading="lazy"
	/>
	{#if image.caption}
		<figcaption class="text-center"><Text text={image.caption} /></figcaption>
	{/if}
</figure>
<Transition show={isOpen}>
	<Dialog
		open={isOpen}
		on:close={() => setIsOpen(false)}
		class="fixed z-50 inset-0 bg-gray-500 cursor-zoom-out"
	>
		<TransitionChild
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-75"
			leave="ease-in duration-200"
			leaveFrom="opacity-75"
			leaveTo="opacity-0"
			entered="opacity-75"
		>
			<DialogOverlay class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		</TransitionChild>
		<TransitionChild
			enter="ease-out transform duration-300"
			enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
			enterTo="opacity-100 translate-y-0 sm:scale-100"
			leave="ease-in transform duration-200"
			leaveFrom="opacity-100 translate-y-0 sm:scale-100"
			leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
		>
			<div class="flex h-screen w-screen">
				<div class="relative m-auto p-2 bg-white rounded">
					<img
						src={large}
						alt={image.caption}
						on:click={() => setIsOpen(false)}
						class="object-contain mx-auto block rounded"
						style=" max-height: 90vh; max-width: 90vw"
					/>
				</div>
			</div>
		</TransitionChild>
	</Dialog>
</Transition>
