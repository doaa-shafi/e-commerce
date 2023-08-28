const AccessControl = require('accesscontrol')

const ac = new AccessControl();
ac.grant('customer') 
    .readOwn('customer')                   
    .updateOwn('customer')  
    .deleteOwn('customer')           
    .readAny('product')
    .readAny('category')
    .readOwn('order')
    .createAny('order')
  .grant('admin')                                  
    .createAny('product')
    .readAny('product')
    .updateAny('product')  
    .deleteAny('product')
    .createAny('category')
    .readAny('category')
    .updateAny('category')  
    .deleteAny('category')
    .readAny('order')
    .readAny('customer')

module.exports={ac}
