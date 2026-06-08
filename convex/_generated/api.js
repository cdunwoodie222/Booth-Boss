function q(n) { return { _type: "query", _functionName: n }; }
function m(n) { return { _type: "mutation", _functionName: n }; }
export const api = {
  income: { getForUser: q("income:getForUser"), getByMonth: q("income:getByMonth"), add: m("income:add"), update: m("income:update"), remove: m("income:remove") },
  expenses: { getForUser: q("expenses:get"), add: m("expenses:add"), remove: m("expenses:remove") },
};
