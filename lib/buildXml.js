const log = require('electron-log');

module.exports = {
    brandingXml: function(base64){
        return new Promise((resolve, reject) => {
            //log.info(base64);
            if(Array.isArray(base64)){
                var base64Brand = base64[1];
                var base64HW = base64[2];
                var base64wp = base64[0];
                var xml2 = `
                <Command>
					<UserInterface>
						<Branding>
							<Upload command='true'>
								<Type>HalfwakeBranding</Type>
									<body>${base64HW}</body>
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

            } else {
                reject("BuildXml: Object is not an array.")
            }

        })

    },
    escapeXML: function (unsafe) {
        return new Promise((resolve, reject) => {
            if(!unsafe){
                reject('Build XML object undefined');
            }
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
    inRoomPanelXml: function (xml,panelName) {
        return new Promise((resolve, reject) => {
            (async _=> {
                if(!xml){
                    reject("BuildXMl is undefined");
                }
                const extension = await this.escapeXML(xml);
                log.info("XML in Room control process building");
                var xml2 = `
	            <Command>
		            <UserInterface>
			            <Extensions>
				            <Panel>
					            <Save>
					               <PanelId>${panelName}</PanelId>
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
    inRoomConfigXml: function (xml,configName) {
        return new Promise((resolve, reject) => {
            (async _=> {
                if(!xml){
                    reject("BuildXMl is undefined");
                }
                const extension = await this.escapeXML(xml);
                log.info("XML in Room control process building");
                var xml2 = `
	            <Command>
		            <UserInterface>
			            <Extensions>
				            <Set>
					            <ConfigID>${configName}</ConfigID>
                                <body>${extension}</body>
					        </Set>		
			            </Extensions>
		            </UserInterface>
	            </Command>`;
                resolve(xml2);
            })()

        })
    },

    macroActivate: function(macroName){
        return new Promise((resolve, reject) => {
            if(!macroName){
                reject("BuildXML macroname is undefined");
            }
            var xml2 = `
                <Activate>
					<Name>${macroName}</Name>
				</Activate>`
            resolve(xml2);
        })
    },
    macroRestart: function(){
        return new Promise((resolve, reject) => {
            var xml2 = `
                <Runtime>
					<Restart command="True"/>
				</Runtime>`;
            resolve(xml2);
        })
    },
    macroXml: function (name,xml, activate) {
        return new Promise((resolve, reject) => {
            (async _=> {
                const extension = await this.escapeXML(xml);
                var macroLaunch = '',
                    macroRunTime;
                if(activate === true){
                    macroLaunch = await this.macroActivate(name);
                    macroRunTime = await this.macroRestart();
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
 		                        ${macroRunTime}
 	                        </Macros>
                    </Command>`;
                resolve(xml2)
            })()
        })
    },
    bundleXml: function(checksum, url){
        return new Promise((resolve) => {
            var xml2 = `
                <Command>
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
    },
    signageXML: function(sign){
        //interactive, delay, refresh, url
        return new Promise((resolve) => {
            var xml2 = `
                <Command>
                    <Standby>
                        <Delay>${sign[1]||4}</Delay>
                        <Signage>
                            <Interactive>${sign[0]||false}</Interactive>
                            <Mode>On</Mode>
                            <RefreshInterval>${sign[2]||0}</RefreshInterval>
                            <Url>${sign[3]}</Url>
                        </Signage>
                    </Standby>
                    <WebEngine>On</WebEngine>
				</Command>`;
            resolve(xml2)
        })
    },
    webBoardTouch: function(){
        return new Promise(resolve => {
            var xml2 = `
                <Configuration>
	                <Peripherals>
		                <Pairing>
			                <CiscoTouchPanels>
				                <RemotePairing valueSpaceRef="/Valuespace/TTPAR_OnOff" hidden="True">On</RemotePairing>
			                </CiscoTouchPanels>
		                </Pairing>
	                </Peripherals>
                </Configuration>`;
            resolve(xml2)
        })
    },
    adminPPhrase: function(data){
        return new Promise(resolve => {
            var xml2 = `
                <Command>
                    <UserManagement>
                        <User>
                            <Passphrase>
                                <Change>
                                    <NewPassphrase>${data[1]}</NewPassphrase>
                                    <OldPassphrase>${data[0]}</OldPassphrase>
                                </Change>
                            </Passphrase>
                        </User>
                    </UserManagement>
                </Command>`;
            resolve(xml2)
        })
    }
}

