const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("distribution contracts", function(){
    let owner;
    let Token;
    let TokenDistribution;
    let TokenDistribution;
    let TokenStaking;
    let TokenStaking;
    let token;

    

    it("deployment",async function(){

        [owner,addr1, addr2, addr3,addr4] = await ethers.getSigners();
        
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy(
            "Test Token",
            "TT",
            "1000000000000000000000000"
        );

        console.log("Token address:", token.address);

        
        //staking contract deployment
        TokenStaking = await ethers.getContractFactory("TokenStaking");
        TokenStaking = await TokenStaking.deploy(token.address, 1,1,10,10);
        console.log("TokenStaking address:", TokenStaking.address);

        //Distribution contract deployment
        TokenDistribution = await ethers.getContractFactory("contracts/DistributionContractAdvisor.sol:TokenDistribution");
        TokenDistribution = await TokenDistribution.deploy(token.address);

        //Seed contract deployment
        TokenSeed = await ethers.getContractFactory("contracts/DistributionContractSeed.sol:TokenDistribution");
        TokenSeed = await TokenSeed.deploy(token.address);

        //Strategic contract deployment
        TokenStrategic = await ethers.getContractFactory("contracts/DistributionContractStrategic.sol:TokenDistribution");
        TokenStrategic = await TokenStrategic.deploy(token.address);


         //Contract private contract deployment
        TokenPrivate = await ethers.getContractFactory("contracts/DistributionContractPrivate.sol:TokenDistribution");
        TokenPrivate = await TokenPrivate.deploy(token.address);
   


    }),
//=============================================================================================================================================
    it("owner should be able to add investor", async function(){
    
    await token.transfer(TokenPrivate.address,100);  
    //expect(await TokenDistribution.addInvestor("0x0000000000000000000000000000000000000000",5)).to.be.reverted; 
    const tx = await TokenPrivate.addInvestor(addr1.address,100);
    await token.transfer(addr1.address,100)
    
    //check if investor is added or not by supplying the address to the investorsInfo mapping
    console.log("Investor is added:",await TokenDistribution.investorsInfo(addr1.address));
    const receipt = await tx.wait();
    
    for (const event of receipt.events) {
    	console.log(`Event ${event.event} with args ${event.args}`);
    }
    console.log("Investor address:",addr1.address);
    console.log("Owner address:",owner.address);
    }),

//=============================================================================================================================================

    // it("withdraw token", async function(){

    //     //Increasing the time
    //     const blockNum= await ethers.provider.getBlockNumber();
	//     const block = await ethers.provider.getBlock(blockNum);
	//     const tstamp = block.timestamp;

    //     await TokenDistribution.setInitialTimestamp(tstamp);
    //     console.log("balance before withdraw:",await token.balanceOf(addr1.address));
    //     await hre.ethers.provider.send('evm_increaseTime', [180 * 24 * 60 * 60]);

    //     //checking available tokens to withdraw
    //     console.log("available tokens to withdraw:",await TokenDistribution.withdrawableTokens(addr1.address));

    //     //using different account to withdraw
    //     const tx = await TokenDistribution.connect(addr1).withdrawTokens();
        
                
        
    //     const receipt = await tx.wait();

    //     for (const event of receipt.events) {
    //         console.log(`Event ${event.event} with args ${event.args}`)
    //     }
    //     //expect(await token.balanceOf(addr1.address)).to.equal(30000000);
    //     console.log("balance after withdraw:",await token.balanceOf(addr1.address));
    // }),

//=============================================================================================================================================

    // it("recover token",async function(){
    //     console.log("balane:",await token.balanceOf(TokenStaking.address));
    //     console.log("contract balance:",await token.balanceOf(TokenStaking.address));
    //     console.log("balane before recovering token:",await token.balanceOf(owner.address));

    //     const tx = await TokenDistribution.recoverToken(token.address,1);
    //     const receipt = await tx.wait();
        
    //     console.log("balane after recovering token:",await token.balanceOf(owner.address));
        
    //     for( const event of receipt.events){
    //         console.log(`Event ${event.event} with args ${event.args} `);
    //     }
    // })

//=============================================================================================================================================

    // it("calculateAvailablePercentage", async function(){
    //     //Increasing the time
    //     const blockNum= await ethers.provider.getBlockNumber();
	//     const block = await ethers.provider.getBlock(blockNum);
	//     const tstamp = block.timestamp;

    //     await TokenDistribution.setInitialTimestamp(tstamp);
    //     console.log("balance before withdraw:",await token.balanceOf(addr1.address));
    //     await hre.ethers.provider.send('evm_mine', [1664634781]);

    //     //checking available tokens to withdraw
    //     console.log("available tokens to withdraw:",await TokenDistribution.withdrawableTokens(addr1.address));

    //     //using different account to withdraw
    //     const tx = await TokenDistribution.connect(addr1).withdrawTokens();

    // })
//=============================================================================================================================================
//    it("seed calculate percentage", async function() {
//     //Increasing the time
//     const blockNum= await ethers.provider.getBlockNumber();
//     const block = await ethers.provider.getBlock(blockNum);
//     const tstamp = block.timestamp;

//     await iCadeTokenSeed.setInitialTimestamp(tstamp);
//     console.log("balance before withdraw:",await token.balanceOf(addr1.address));
//     await hre.ethers.provider.send('evm_mine', [1667658781]);

//     //checking available tokens to withdraw
//     console.log("available tokens to withdraw:",await TokenSeed.withdrawableTokens(addr1.address));

//     //using different account to withdraw
//     const tx = await TokenSeed.connect(addr1).withdrawTokens();

//    })
//=============================================================================================================================================
    // it("Strategic calculate percentage", async function() {
    //     //Increasing the time
    //     const blockNum= await ethers.provider.getBlockNumber();
    //     const block = await ethers.provider.getBlock(blockNum);
    //     const tstamp = block.timestamp;

    //     await TokenStrategic.setInitialTimestamp(tstamp);
    //     console.log("balance before withdraw:",await token.balanceOf(addr1.address));
    //     await hre.ethers.provider.send('evm_mine', [1663954381]);

    //     //checking available tokens to withdraw
    //     console.log("available tokens to withdraw:",await TokenStrategic.withdrawableTokens(addr1.address));

    //     //using different account to withdraw
    //     const tx = await TokenStrategic.connect(addr1).withdrawTokens();

    // })
//=============================================================================================================================================
it("Distribution contract private calculate percentage", async function() {
    //Increasing the time
    const blockNum= await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNum);
    const tstamp = block.timestamp;

    await TokenPrivate.setInitialTimestamp(tstamp);
    console.log("balance before withdraw:",await token.balanceOf(addr1.address));
    await hre.ethers.provider.send('evm_mine', [1653406773]);

    //checking available tokens to withdraw
    console.log("available tokens to withdraw:",await TokenPrivate.withdrawableTokens(addr1.address));

    //5% on listing
    expect(await TokenPrivate.withdrawableTokens(addr1.address)).is.equal(5);

    //4% after 30 days
    await hre.ethers.provider.send('evm_mine', [1656085173]);
    expect(await TokenPrivate.withdrawableTokens(addr1.address)).is.equal(9);

    //  3 months  cliff period then 6.5% for 14 months
    await hre.ethers.provider.send('evm_mine', [1666625973]);
    expect(await TokenPrivate.withdrawableTokens(addr1.address)).is.equal(16);



    //using different account to withdraw
    const tx = await TokenPrivate.connect(addr1).withdrawTokens();

})
});
