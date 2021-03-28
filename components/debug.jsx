
const Debug = () => (
	<div className="fixed bottom-0 right-0">
		<div className="sm:block md:hidden p-2 bg-yellow-500">Small</div>
		<div className="md:block lg:hidden hidden p-2 bg-green-500">Medium</div>
		<div className="lg:block xl:hidden hidden p-2 bg-blue-500">Large</div>
		<div className="xl:block 2xl:hidden hidden p-2 bg-purple-500">X-Large</div>
		<div className="2xl:block hidden p-2 bg-red-500">XX-Large</div>
	</div>
)

export default Debug
