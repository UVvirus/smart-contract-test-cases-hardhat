const { expect } = require("chai");
const { ethers } = require("hardhat");
//=============================================================================================================================//

describe.only("Staking Token Contract", function() {
  let TokenStaking;
  let Token;
  let TokenStaking;
  let owner;
  
 
 it("deployment",async function (){
   [owner,addr1]=await ethers.getSigners();
   
   
   //deploying token contract
   Token = await ethers.getContractFactory("Token");
   Token_deploy = await Token.deploy("UV","uv",1000000);
   
   
   //deploying staking contract
   TokenStaking = await ethers.getContractFactory("ICadeTokenStaking");
   TokenStaking = await TokenStaking.deploy(Token_deploy.address,0,1,1, 2592000);
   
   
 });

 //=============================================================================================================================//
 
 it("should emit Staked event", async function() {
 TokenStaking_address = TokenStaking.address;
   console.log("iCadeTokenStaking contract address:",TokenStaking_address);
  
   //allowance
   await Token_deploy.approve(TokenStaking_address,100); 
   
   
   //setting rewardDistribtion
   await TokenStaking.setRewardDistribution(owner.address);
   
   await TokenStaking.notifyRewardDistribution();

  //amount should be greater than zero
  //await(TokenStaking.stake(-1));
      
   const tx = await TokenStaking.stake(10);
   await hre.ethers.provider.send('evm_increaseTime',[730*24*60*60]);
   //Checking whether the balance is updated or not
   //expect(await Token_deploy.balanceOf(TokenStaking.address)).to.equal(10);

   const receipt = await tx.wait();

   //Emitting the event
  for (const event of receipt.events) {
    console.log(`Event ${event.event} with args ${event.args}`);
  }
   
   
   
    }),
  //=============================================================================================================================//

    it("unstake", async function(){

      console.log("balance before unstaking:",await Token_deploy.balanceOf(TokenStaking.address));

      //check if user has sufficient balance
      //console.log("Amount of tokens staked by user:",await TokenStaking.users(owner.address)).toString();
      //await hre.ethers.provider.send('evm_increaseTime',[30*24*60*60]);

      //calling unstake()
      const tx = await TokenStaking.unstake(5,false);
      console.log("balance after unstaking:",await Token_deploy.balanceOf(TokenStaking.address));

      //After unstaking 5 tokens remaining balance should be 5
      expect (await Token_deploy.balanceOf(TokenStaking.address)).to.equal(5);

      //Total supply should reduce after unstaking
      console.log("Totalsupply check:",await TokenStaking.totalSupply());

      const receipt = await tx.wait();

      for (const event of receipt.events) {
        console.log(`Event ${event.event} with args ${event.args}`);
      }

    }),
 //=============================================================================================================================//


    it("Should emit RecoverToken event", async function(){
      console.log("Before recovering excess token:",await Token_deploy.balanceOf(owner.address));

      const tx = await TokenStaking.recoverExcessToken(Token_deploy.address,1);
  
      expect(await Token_deploy.balanceOf(owner.address)).to.equal(999996);
      console.log("after recovering excess token:",await Token_deploy.balanceOf(owner.address));

      const receipt = await tx.wait();

      console.log("Token contract address:",Token_deploy.address);
      for (const event of receipt.events) {
        console.log(`Event ${event.event} with args ${event.args}`);
      }
      
    }),
  //=============================================================================================================================//

    it("Should emit UnstakeTaxCollected event  ",async function(){

      
      //await expect(TokenStaking.collectUnstakeTax()).to.emit(TokenStaking,"UnstakeTaxCollected");

      const tx = await TokenStaking.collectUnstakeTax();
      
      const receipt = await tx.wait();

      for (const event of receipt.events) {
        console.log(`Event ${event.event} with args ${event.args}`);
      }
    }),

  //=============================================================================================================================//

    
  //   it("Should emit RewardReInvested event",async function(){
    	
  //   await expect(iCadeTokenStaking.reinvestFor(owner.address)).to.emit(TokenStaking,"RewardReInvested");
    
  //   const tx = await TokenStaking.reinvest();
  //   const receipt = await tx.wait();
    
  //   for (const event of receipt.events) {
  //   	console.log(`Event ${event.event} with args ${event.args}`);
  //   }
  //   }),

  // //=============================================================================================================================//


  //   it("getReward() function", async function(){
  //     console.log("last update time:",await TokenStaking.users[owner.address].rewards)//.rewards.toString());

  //     await TokenStaking.setDuration(1);

  //     console.log("balance before withdraw:",await Token_deploy.balanceOf(addr1.address));
  //     await hre.ethers.provider.send('evm_increaseTime', [365 * 24 * 60 * 60]);

  //     console.log("Earned:",await TokenStaking.earned(owner.address));
  //     const tx = await TokenStaking.getReward();

  //     //value = await TokenStaking.users(owner.address)
  //     console.log("converting from big number:",ethers.utils.formatEther( owner.address ))
  //     const receipt = await tx.wait();

  //     for (const event of receipt.events) {
  //       console.log(`Event ${event.event} with args ${event.args}`);
  //     }
  //     console.log("is reward updated:",await TokenStaking.users(owner.address))
  //   }),

 //=============================================================================================================================//
    it("setRewardDistributin function()", async function(){
      TokenStaking.renounceOwnership(owner.address);
      
      expect(TokenStaking.setRewardDistribution(owner.address)).to.be.reverted;
    });
    

    it("reward function again check", async function(){
      console.log("last time reward applicable:",await TokenStaking.lastTimeRewardApplicable())
      console.log("get user data:",await TokenStaking.getUserData(owner.address));
    })

    
  });

