import InstallPackage from "../installPackage";

export default function InstallPackageDemo() {
	return (
		<InstallPackage
			command="@loremus299/lychee"
			copyPrompt="This is an actual package btw :3"
			className="max-w-80 w-full"
		/>
	);
}
