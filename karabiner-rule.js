const childProcess = require('child_process');
const path = require('path');

const OSASCRIPT_BIN = childProcess.execSync('which osascript').toString().trim();
const SET_BOUNDS_SCPT = path.resolve(__dirname, 'set-window-bounds.applescript');

const DESCRIPTION = `Position current window along a keyboard-based grid`;

const MODIFIERS = ['shift'];

const KEYBOARD_ROWS = [
	['1', '2', '3', '4', '5', '6'],
	['q', 'w', 'e', 'r', 't', 'y'],
	['a', 's', 'd', 'f', 'g', 'h'],
	['z', 'x', 'c', 'v', 'b', 'n']
];

const manipulators = [];

for (let firstRowIndex = 0; firstRowIndex < KEYBOARD_ROWS.length; firstRowIndex += 1) {
	const firstRow = KEYBOARD_ROWS[firstRowIndex];

	for (let firstColIndex = 0; firstColIndex < firstRow.length; firstColIndex += 1) {
		const firstKey = firstRow[firstColIndex];

		for (let secondRowIndex = 0; secondRowIndex < KEYBOARD_ROWS.length; secondRowIndex += 1) {
			const secondRow = KEYBOARD_ROWS[secondRowIndex];

			for (let secondColIndex = 0; secondColIndex < secondRow.length; secondColIndex += 1) {
				if (secondRowIndex > firstRowIndex || secondColIndex > firstColIndex) {
					const secondKey = secondRow[secondColIndex];

					const left = Math.min(firstColIndex, secondColIndex) / firstRow.length;
					const top = Math.min(firstRowIndex, secondRowIndex) / KEYBOARD_ROWS.length;
					const width = (Math.abs(secondColIndex - firstColIndex) + 1) / firstRow.length;
					const height = (Math.abs(secondRowIndex - firstRowIndex) + 1) / KEYBOARD_ROWS.length

					const bounds = [left, top, width, height];

					const command = `${OSASCRIPT_BIN} ${SET_BOUNDS_SCPT} ${bounds.join(' ')}`;

					// console.log(`${firstKey} + ${secondKey} = [ ${bounds.join(', ')} ]`);

					manipulators.push({
						type: 'basic',
						from: {
							simultaneous: [
								{ key_code: firstKey },
								{ key_code: secondKey }
							],
							modifiers: { mandatory: MODIFIERS }
						},
						to: [{ shell_command: command }]
					});
				}
			}
		}
	}
}

module.exports = {
	description: DESCRIPTION,
	manipulators
};

// console.log(JSON.stringify(module.exports, null, 4));
