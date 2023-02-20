const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("Hashstack", () => {
   let Proxy, acontract;
   
   it("deploy", async () => {
      [addr1]= await ethers.getSigners();
      const Acontract = await ethers.getContractFactory("A_Upgradeable");
      acontract = await upgrades.deployProxy(Acontract,);
      await acontract.deployed();
      
      console.log(acontract.address, "A(proxy) address");

      console.log(await upgrades.erc1967.getImplementationAddress(acontract.address), "implementation");


      console.log(await upgrades.erc1967.getAdminAddress(acontract.address), "admin address");
   })

   it("test", async () => {

      //calling the getter function in contract A must return 0.
      let getterFunction = await acontract.readCounter();
      console.log(getterFunction);

      //call the setter function with an input of 10.
      let inc = await acontract.increase(10);
      //let eve = await inc.wait()
      
      //Now call the getter function. It must return the value 10.
      let getterFunction2 = await acontract.readCounter();
      console.log(getterFunction2);

      //Fetch the admin address of contract A
      let adminAddressOfA = await acontract.getAdminAddress();
      console.log(adminAddressOfA);

      //Change the admin address of contract A to some other address from the access registry.
      //await acontract.changeAdminAddress(addr1.address);

      //call the setter function with an input of 81
      await acontract.increase(81);
      let getterFunction3 = await acontract.readCounter();
      console.log(getterFunction3);
      

   })
})