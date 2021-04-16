const Battle = artifacts.require("Battle");
const NDR_ABI = require('../abis/Ndr_abi.json');
const UNISWAP_ABI = require('../abis/Uniswap_abi.json');

// Traditional Truffle test
contract("Battle", accounts => {
  it("deploy", async function() {
    const uniswapV2Router02 = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
    const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    const NDRAddress = "0x739763a258640919981F9bA610AE65492455bE53";
    const battle = await Battle.new("0x739763a258640919981F9bA610AE65492455bE53", "0x89eE76cC25Fcbf1714ed575FAa6A10202B71c26A");
    let ndr = new web3.eth.Contract(NDR_ABI, NDRAddress);
    let uniswap = new web3.eth.Contract(UNISWAP_ABI, uniswapV2Router02);
    let amountDeposit = web3.utils.toBN(100 * 10 ** 18);
    await uniswap.methods.swapETHForExactTokens(amountDeposit.toString(), [WETHAddress, NDRAddress], accounts[0], '9600952122').send({from:accounts[0], value:amountDeposit.toString(), gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});
    await uniswap.methods.swapETHForExactTokens(amountDeposit.toString(), [WETHAddress, NDRAddress], accounts[1], '9600952122').send({from:accounts[1], value:amountDeposit.toString(), gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});
    
  
    await ndr.methods.approve(battle.address, amountDeposit.toString()).send({from:accounts[0], gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});
    await ndr.methods.approve(battle.address, amountDeposit.toString()).send({from:accounts[1], gas: 3000000, gasPrice: web3.utils.toWei("1", "gwei")});

    let teamId = 1;
    await battle.startBattle({from: accounts[0]});
    await battle.selectTeam(teamId, {from: accounts[0]});
    await battle.selectTeam(teamId, {from: accounts[1]});

    let stakeAmount0 = web3.utils.toBN(5 * 10 ** 18);
    let stakeAmount1 = web3.utils.toBN(7 * 10 ** 18);
    await battle.stakeNDR(stakeAmount0, {from : accounts[0]});
    await battle.stakeNDR(stakeAmount1, {from : accounts[1]});
    let balance0 = await ndr.methods.balanceOf(accounts[0]).call();
    let balance1 = await ndr.methods.balanceOf(accounts[1]).call();
    let teamBalance = await battle.getTeamNDRAmount(teamId);
    console.log(teamBalance.toString());
    console.log(balance0.toString());
    console.log(balance1.toString());
    await battle.withdraw({from : accounts[0]});
    await battle.withdraw({from : accounts[1]});
    let balance0afterwithdraw = await ndr.methods.balanceOf(accounts[0]).call();
    let balance1afterwithdraw = await ndr.methods.balanceOf(accounts[1]).call();
    console.log(balance0afterwithdraw.toString());
    console.log(balance1afterwithdraw.toString());
    // console.log(battle.address);
  });
});