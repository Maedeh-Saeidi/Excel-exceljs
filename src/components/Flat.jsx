export default function Flat({ userInfo }) {
  function flatObject(obj) {
    const keysToDelete = [
      "biotype",
      "biotypeId",
      "caseStudyId",
      "containerId",
      "createUserId",
      "description",
      "facilityId",
      "id",
      "isParticipant",
      "locationId",
      "parentId",
      "studyId",
      "transferId",
      "_pedigree",
      "updateDate",
      "expireDate",
    ];
    keysToDelete.forEach((key) => {
      delete obj[key];
    });
    const e = {};
    obj.customfields.forEach((x) => {
      e[x.id] = `${x.name}\n ${x.value}`;
    });
    const x = {
      ...obj,
      ...e,
    };
    removeElement(x);
    return x;
  }
  function removeElement(x) {
    x.customfields = null;
  }
}
