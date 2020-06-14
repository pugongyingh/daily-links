const mailUtils = {
  getMailBody1: content => {
    const details = {
      name: content.name,
      message: content.message,
      email: content.email
    };

    return `${details.name}您好!\n
    扫码自助点餐，顾客只需扫描桌面二维码，即可自助点餐，无需等待服务员到场。同时，后厨根据点餐内容即可按桌号备餐，全程自动化！帮助你实现高峰期客户分流，人力成本立减30%，并且增加顾客体验感。
如果您有这方面的需求请联系我们：www.smdc.vip`;
  },
  getMailBody2: content => {
    const details = {
      name: content.name,
      message: content.message,
      email: content.email
    };

    return `${details.name}您好!\n
    扫码自助点餐，顾客只需扫描桌面二维码，即可自助点餐，无需等待服务员到场。同时，后厨根据点餐内容即可按桌号备餐，全程自动化！帮助你实现高峰期客户分流，人力成本立减30%
如果您有这方面的需求请联系我们：www.smdc.vip`;
  },
  getMailBody3: content => {
    const details = {
      name: content.name,
      message: content.message,
      email: content.email
    };

    return `${details.name}您好!\n
    扫码自助点餐，顾客只需扫描桌面二维码，即可自助点餐，无需等待服务员到场。同时，后厨根据点餐内容即可按桌号备餐，全程自动化！有效缓解酒店餐厅用餐高峰情况，提升门店效率。
如果您有这方面的需求请联系我们：www.smdc.vip`;
  },
  getMailBody4: content => {
    const details = {
      name: content.name,
      message: content.message,
      email: content.email
    };

    return `${details.name}您好!\n
    扫码自助点餐，顾客只需扫描桌面二维码，即可自助点餐，无需等待服务员到场。同时，后厨根据点餐内容即可按桌号备餐，全程自动化！帮助你实现高峰期客户分流，人力成本立减30%
如果您有这方面的需求请联系我们：www.smdc.vip`;
  },
  getMailBody5: content => {
    const details = {
      name: content.name,
      message: content.message,
      email: content.email
    };

    return `${details.name}您好!\n
    扫码自助点餐，顾客只需扫描桌面二维码，即可自助点餐，无需等待服务员到场。同时，后厨根据点餐内容即可按桌号备餐，全程自动化！用餐高峰，也无需增加人力。
如果您有这方面的需求请联系我们：www.smdc.vip`;
  },
    getMailSub1: content => {
    const details = {
      name: content.name
    };
    return `扫码自助点餐`;
  },
  getMailSub2: content => {
    const details = {
      name: content.name
    };
    return `扫码点餐`;
  },
  getMailSub3: content => {
    const details = {
      name: content.name
    };
    return `扫二维码自助点餐`;
  },
  getMailSub4: content => {
    const details = {
      name: content.name
    };

    return `扫码二维码点餐`;
  },
  getMailSub5: content => {
    const details = {
      name: content.name
    };

    return `自助点餐应用`;
  }
};

module.exports = mailUtils;
