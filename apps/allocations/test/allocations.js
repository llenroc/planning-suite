const Allocations = artifacts.require('Allocations')
const DAOFactory = artifacts.require('@aragon/os/contracts/factory/DAOFactory')
const EVMScriptRegistryFactory = artifacts.require(
  '@aragon/os/contracts/factory/EVMScriptRegistryFactory'
)
const ACL = artifacts.require('@aragon/os/contracts/acl/ACL')
const Kernel = artifacts.require('@aragon/os/contracts/kernel/Kernel')

// TODO: Fix Vault not loading artifacts error
// const Vault = artifacts.require('@aragon/apps-vault/contracts/Vault')

const getContract = name => artifacts.require(name)
const createdPayoutId = receipt =>
  receipt.logs.filter(x => x.event == 'StartPayout')[0].args.voteId

const ANY_ADDR = ' 0xffffffffffffffffffffffffffffffffffffffff'

contract('Allocations App', accounts => {
  let daoFact,
    app = {}

  const root = accounts[0]

  before(async () => {
    const kernelBase = await getContract('Kernel').new()
    const aclBase = await getContract('ACL').new()
    const regFact = await EVMScriptRegistryFactory.new()
    daoFact = await DAOFactory.new(
      kernelBase.address,
      aclBase.address,
      regFact.address
    )
  })

  beforeEach(async () => {
    const r = await daoFact.newDAO(root)
    const dao = Kernel.at(
      r.logs.filter(l => l.event == 'DeployDAO')[0].args.dao
    )
    const acl = ACL.at(await dao.acl())

    await acl.createPermission(
      root,
      dao.address,
      await dao.APP_MANAGER_ROLE(),
      root,
      { from: root }
    )

    const receipt = await dao.newAppInstance(
      '0x1234',
      (await Allocations.new()).address,
      { from: root }
    )
    app = Allocations.at(
      receipt.logs.filter(l => l.event == 'NewAppProxy')[0].args.proxy
    )

    await acl.createPermission(
      ANY_ADDR,
      app.address,
      await app.START_PAYOUT_ROLE(),
      root,
      { from: root }
    )
    await acl.createPermission(
      ANY_ADDR,
      app.address,
      await app.SET_DISTRIBUTION_ROLE(),
      root,
      { from: root }
    )
    await acl.createPermission(
      ANY_ADDR,
      app.address,
      await app.EXECUTE_PAYOUT_ROLE(),
      root,
      { from: root }
    )

    // TODO: Fix vault
    // vault = Vault.at(
    //   receipt.logs.filter(l => l.event == 'NewAppProxy')[0].args.proxy
    // )

    // receipt = await dao.newAppInstance(
    //   '0x2345',
    //   (await Allocations.new()).address,
    //   { from: root }
    // )

    // allocation = Allocations.at(
    //   receipt.logs.filter(l => l.event == 'NewAppProxy')[0].args.proxy
    // )
  })

  context('main context', () => {
    const empire = accounts[0]
    const bobafett = accounts[1]
    const dengar = accounts[2]
    const bossk = accounts[3]

    before(async () => {})

    beforeEach(async () => {})

    it('initialize, set distribution, and run payout', async () => {
      // TODO: Test does not work, fix
      // const imperialunderfundedBudget = await web3.eth.getBalance(empire)
      // var send = await web3.eth.sendTransaction({
      //   from: empire,
      //   to: app.address,
      //   value: web3.toWei(0.01, 'ether'),
      // })
      // const bobafettInitialBalance = await web3.eth.getBalance(bobafett)
      // const dengarInitialBalance = await web3.eth.getBalance(dengar)
      // const bosskInitialBalance = await web3.eth.getBalance(bossk)
      // candidateKeys = ['0x1', '0x2', '0x3']
      // candidateAddresses = [bobafett, dengar, bossk]
      // await allocation.initializePayout(app.address, { from: empire })
      // let allocationId = (await app.newPayout(
      //   'Fett\'s vett',
      //   web3.toWei(1, 'ether'),
      //   address(0)
      // )).toNumber()
      // supports = [500, 200, 300]
      // totalsupport = 1000
      // await app.setDistribution(
      //   candidateKeys,
      //   supports,
      //   allocationId,
      //   false,
      //   false,
      //   0,
      //   web3.toWei(0.01, 'ether'),
      //   { from: empire }
      // )
      // await app.executePayout(allocationId)
      // const bobafettBalance = await web3.eth.getBalance(bobafett)
      // const dengarBalance = await web3.eth.getBalance(dengar)
      // const bosskBalance = await web3.eth.getBalance(bossk)
      // assert.equal(
      //   bobafettBalance.toNumber() - bobafettInitialBalance.toNumber(),
      //   (web3.toWei(0.01, 'ether') * supports[0]) / totalsupport,
      //   'bounty hunter expense'
      // )
      // assert.equal(
      //   dengarBalance.toNumber() - dengarInitialBalance.toNumber(),
      //   (web3.toWei(0.01, 'ether') * supports[1]) / totalsupport,
      //   'bounty hunter expense'
      // )
      // assert.equal(
      //   bosskBalance.toNumber() - bosskInitialBalance.toNumber(),
      //   (web3.toWei(0.01, 'ether') * supports[2]) / totalsupport,
      //   'bounty hunter expense'
      // )
    })
  })
})