const log = require('electron-log');

module.exports = {
    brandingXml: function(base64){
        return new Promise(function(resolve){
            var base64Brand = base64[1];
            var base64wp = base64[0];
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
            log.info("Build Branding XML completed");
            resolve(xml2)

        })

    },
    escapeXML: function (unsafe) {
        return new Promise((resolve, reject) => {
            const safe = unsafe.replace(/[<>&'"]/g, function (c) {
                switch (c) {
                    case '<':
                        return '&lt;';
                    case '>':
                        return '&gt;';
                    case '&':
                        return '&amp;';
                    case "'":
                        return '&apos;';
                    case '"':
                        return '&quot;';

                }
            });
            log.info("escape results: "+safe);
            resolve(safe);

        })
    },
    inRoomXml: function (xml) {
        return new Promise((resolve, reject) => {
            (async _=> {

                const extension = await this.escapeXML(xml);

                log.info("XML in Room control process building");
                var xml2 = `
	            <Command>
		            <UserInterface>
			            <Extensions>
				            <Panel>
					            <Save>
						            <PanelId>newPanel</PanelId>
						            <body>${extension}</body>
					            </Save>
				            </Panel>		
			            </Extensions>
		            </UserInterface>
	            </Command>`;
                resolve(xml2);
            })()

        })
    },
    macroActivate: function(macroName){
        return new Promise((resolve, reject) => {

            var xml2 = `
                <Activate>
					<Name>${macroName}</Name>
				</Activate>`
            resolve(xml2);
        })
    },
    macroXml: function (name,xml, activate) {
        return new Promise((resolve, reject) => {
            (async _=> {
                const extension = await this.escapeXML(xml);
                var macroLaunch = '';
                if(activate === true){
                    macroLaunch = await this.macroActivate(name);
                }
                log.info("XML Macro process building");
                var xml2 = `
                    <Command>
	        				<Macros>
 		                        <Macro>
 			                        <Save>
 				                        <Name>${name}</Name>
 				                        <OverWrite>True</OverWrite>
 				                        <body>${extension}</body>
 			                        </Save>
 			                        ${macroLaunch}
 		                        </Macro>
 	                        </Macros>
                    </Command>`;
                resolve(xml2)
            })()
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

