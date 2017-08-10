export const CFG_SAVE_PROFILE = 'CFG_SAVE_PROFILE';
export const CFG_SAVE_PROFILE_SUM = 'CFG_SAVE_PROFILE_SUM';
export const CFG_SAVE_SETTINGS = 'CFG_SAVE_SETTINGS';

export const ConfigApis = {
  EntProfileQuery: 'ent-profile-query.do',
  EntProfileSum: 'ent-profile-sum.do',
  EntProfileSave: 'ent-profile-save.do',
  SysOptsQuery: 'sys-opts-query.do',
  SysOptSave: 'sys-opt-save.do',
};

export function profileSave(profile) {
  return {
    type: CFG_SAVE_PROFILE,
    data: profile,
  };
}

export function profileSumSave(sum) {
  return {
    type: CFG_SAVE_PROFILE_SUM,
    data: sum,
  };
}

export function settingsSave(settings) {
  return {
    type: CFG_SAVE_SETTINGS,
    data: settings,
  };
}