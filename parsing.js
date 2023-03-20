const hhhh = await page.waitForSelector(
  'div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td>a>span[class="label label-default float-right"]',
);
const hhhh2 = await page.waitForSelector('div>div>div>div>div>div>table[id="dbtable"]>tbody>tr[class="odd"]>td>a');
console.log(await hhhh?.evaluate((el) => el.textContent));
console.log(await hhhh2?.evaluate((el) => el.textContent));

const fullInfo = [];

for (let i = 1; i < 50; i++) {
  console.log(i);
  await page.goto(`https://systemobsluginajmu.pl/estates/view-estate/${i}`);
  const apInfo = await page.waitForSelector('div[class="adminpanelEstatesViewEstate"]');
  if (!apInfo) return [p, fullInfo];
  const info = await apInfo?.evaluate((el) => el?.innerText);
  fullInfo.push(info);
}
