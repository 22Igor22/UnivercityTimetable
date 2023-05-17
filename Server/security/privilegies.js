const { AbilityBuilder, Ability } = require("@casl/ability");
const {Admin, User: User} = require("./roles")

const {admin, user: user, guest, rule} = require("./defines");

exports.GetAbilityFor = (req) => {
    const {rules, can, cannot} = new AbilityBuilder(Ability);
    switch (req.payload.role) {
        case Admin:
            can(rule.admin)
            //can(admin.manage, admin.all);
            break;
        case User:
            can(rule.user)
            //can(enrollee.manage, enrollee.all);

            //labs
            // can(
            //     [access.read, access.create, access.update],
            //     [entity.repos, entity.commits],
            //     {authorid: req.payload.id}
            // );
            break;
        default:
            can(rule.guests)
            //can(guest.manage, guest.all);

            //Labs
            // can(
            //     access.read,
            //     [entity.repos, entity.commits]
            // );
            break;
    }
    req.rules = rules;
    return new Ability(rules);
}