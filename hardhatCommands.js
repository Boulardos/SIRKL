yarn init
yarn add --dev hardhat
yarn hardhat
yarn add @openzeppelin/contracts or npm install @openzeppelin/contracts
yarn hardhat node // local blockchain
yarn hardhat compile
// yarn hardhat run .\scripts\deploy.ts --network localhost     (not working)
yarn hardhat run ./scripts/deploy.ts --network localhost
npx hardhat run scripts/deploy.ts --network goerli
// option + shift + / = \
// option + shift + 5 = []
npx hardhat verify --network goerli <contract address> <constructor argument 1>
npm install --save-dev dotenv // install .env
