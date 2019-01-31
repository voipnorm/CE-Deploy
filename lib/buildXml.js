
module.exports = {
    brandingXml: function(base64){
        return new Promise(function(resolve){
            var base64Brand = base64[0];
            var base64wp = base64[1];
            var xml2 = `<Command>
					<UserInterface>
						<Branding>
							<Upload command='true'>
								<Type>HalfwakeBranding</Type>
									<body>${base64Brand}</body>
								</Upload>
							<Upload command='true'>
								<Type>Branding</Type>
									<body>${base64Brand}</body>
							</Upload>
							<Upload command='true'>
								<Type>HalfwakeBackground</Type>
									<body>${base64wp}</body>
								</Upload>
						</Branding>
					</UserInterface>
				</Command>`;

            resolve(xml2)

        })

    },
    inRoomXml: function(extension){
        return new Promise(function(resolve) {
            var xml2 = `
                <Command>
					<UserInterface>
						${extension}
					</UserInterface>
				</Command>`;


        })
    },
    macroXml: function (name,) {
        return new Promise(function (resolve) {
            var xml2 = `
                    <Command>
	        				<Macros>
 		                        <Macro>
 			                        <Save>
 				                        <Name>${name}</Name>
 				                        <OverWrite>True</OverWrite>
 				                        <body>${body}</body>
 			                        </Save>
 		                        </Macro>
 	                        </Macros>
                    </Command>`;
            resolve(xml2)
        })
    },
    bundleXml: function(checksum, url){
        return new Promise(function(resolve){
            var xml2 = `<Command>
					<Provisioning>
						<Service>
							<Fetch>
								<URL>${url}</URL>
								<Checksum>${checksum}</Checksum>	
							</Fetch>
						</Service>
					</Provisioning>
				</Command>`;
            resolve(xml2)
        })
    }
}

