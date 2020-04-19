const path = require('path');
const os = require('os');
const childProcess = require('child_process');
const latestRule = require('./karabiner-rule');
const fs = require('fs');

const KARABINER_BIN = '/Library/Application Support/org.pqrs/Karabiner-Elements/bin/karabiner_cli';
const KARABINER_CONFIG = path.resolve(os.homedir(), '.config/karabiner/karabiner.json');

const config = require(KARABINER_CONFIG);

const currentProfileName = childProcess.execSync(`"${KARABINER_BIN}" --show-current-profile-name`)
	.toString().trim();

const currentProfile = config.profiles
	.find(profile => profile.name === currentProfileName);

const existingRuleIndex = currentProfile.complex_modifications.rules
	.findIndex(rule => rule.description === latestRule.description);

if (existingRuleIndex !== -1) {
	currentProfile.complex_modifications.rules.splice(existingRuleIndex, 1);
}

currentProfile.complex_modifications.rules.push(latestRule);

fs.writeFileSync(KARABINER_CONFIG, JSON.stringify(config, null, 2));
