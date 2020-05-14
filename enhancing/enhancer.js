module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  if (item && item.enhancement < 20) item.enhancement += 1;
  else item.enhancement = 20;
  return { ...item };
}

function fail(item) {
  item.durability = setDurability(item.enhancement, item.durability);
  if (item.enhancement > 16) item.enhancement -= 1;

  return { ...item };
}

function repair(item) {
  item.durability = 100;
  return { ...item };
}

function get(item) {
  if (item.enhancement > 0) item.name = `[+${item.enhancement}] ${item.name}`;
  return { ...item };
}

function setDurability(enhancement, durability) {
  let result;
  if (enhancement < 15) result = durability - 5;
  if (enhancement >= 15) result = durability - 10;

  return result < 0 ? 0 : result;
}
