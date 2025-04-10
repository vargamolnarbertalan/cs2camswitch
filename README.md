# Automated CS2 camera mixer LHM addon by B3RC1
## Intro
This is an addon for LHM app which allows you to implement automated camera mixing based on CS2 game state integration (a.k.a. which player the observer is spectating). Supports 1v1 scenarios and free cam too.
Based on the official [demo addon](https://github.com/lexogrine/lhm-addon-example) and [CSGOSI npm library](https://www.npmjs.com/package/csgogsi).

## Installation
**Only works with [Bitfocus Companion](https://bitfocus.io/companion)!**
> You need to have NodeJS v18+ and LHM.gg installed. Furthermore you may need to have payed plan in LHM app.

Drag and drop the `addon.zip` archive into the LHM.gg addon tab. Toggle on this addon.

## Usage
This addon works with almost all production systems since it does not directly communicate with a mixer, but sends commands to Companion. What you do there is completely up to you. 
You must have a dedicated page inside your companion preset. There you shall place buttons as in the example page in this repository and as described below:

- **ROW 0 COLUMN 1-5**: Commands that will run upon spectating players 1-5 from team left from the admin GUI. (First mix)
- **ROW 1 COLUMN 1-5**: Commands that will run upon spectating players 1-5 from team right from the admin GUI. (First mix)
- **ROW 2 COLUMN 1-5**: Commands that will run upon spectating players 1-5 from team left from the admin GUI. (Second mix)
- **ROW 3 COLUMN 1-5**: Commands that will run upon spectating players 1-5 from team right from the admin GUI. (Second mix)

- **ROW 0 COLUMN 7**: Command that will run when a 1v1 starts.
- **ROW 1 COLUMN 7**: Command that will run when a 1v1 ends.

- **ROW 2 COLUMN 7**: Command that will run upon entering free cam mode.
- **ROW 3 COLUMN 7**: Command that will run upon exiting free cam mode.

## Admin GUI
- **Companion url**: Any valid HTTP(S) URL which via the addon can reach the Companion. Example: `http://127.0.0.1:8000`.
- **Companion page**: Any valid page number that you configured in Companion for this addon to use. Example: `20`.
- **Players**: Select the player who should be linked to the specific Companion button.


## License
This software is not open source. You are not permitted to use, distribute, or modify this software without prior written permission and payment to the creator.
To use this software, you must purchase a license.
For licensing inquiries, please contact: [vargamolnarb@gmail.com].
Unauthorized use is strictly prohibited and may result in legal action.