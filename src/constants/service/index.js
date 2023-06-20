//symptoms icons
import fluIcon from 'assets/icons/symptoms/flu.png';
import headacheIcon from 'assets/icons/symptoms/headache.png';
import highFeverIcon from 'assets/icons/symptoms/high-fever.png';
import stomachacheIcon from 'assets/icons/symptoms/stomachache.png';
import indigestionIcon from 'assets/icons/symptoms/indigestion.png';
import acheIcon from 'assets/icons/symptoms/ache.png';
import chillIcon from 'assets/icons/symptoms/chill.png';
import constipationIcon from 'assets/icons/symptoms/constipation.png';
import diarrheaIcon from 'assets/icons/symptoms/diarrhea.png';
import heartburnIcon from 'assets/icons/symptoms/heartburn.png';
import muscularPainIcon from 'assets/icons/symptoms/muscular-pain.png';
import arthralgiaIcon from 'assets/icons/symptoms/arthralgia.png';

//medical-subjects icons
import internalMedicineIcon from 'assets/icons/medical-subjects/internal-medicine.png';
import otolaryngologyIcon from 'assets/icons/medical-subjects/otolaryngology.png';
import surgeryIcon from 'assets/icons/medical-subjects/surgery.png';
import dentistryIcon from 'assets/icons/medical-subjects/dentistry.png';
import pediatryIcon from 'assets/icons/medical-subjects/pediatry.png';
import gynecologyIcon from 'assets/icons/medical-subjects/gynecology.png';
import dermatologyIcon from 'assets/icons/medical-subjects/dermatology.png';
import ophthalmologyIcon from 'assets/icons/medical-subjects/ophthalmology.png';
import emergencyMedicineIcon from 'assets/icons/medical-subjects/emergency-medicine.png';
import familyMedicineIcon from 'assets/icons/medical-subjects/family-medicine.png';
import urologyIcon from 'assets/icons/medical-subjects/urology.png';
import psychiatryIcon from 'assets/icons/medical-subjects/psychiatry.png';
import orthopedicsIcon from 'assets/icons/medical-subjects/orthopedics.png';
import rehabilitationMedicineIcon from 'assets/icons/medical-subjects/rehabilitation-medicine.png';
import rheumatismIcon from 'assets/icons/medical-subjects/rheumatism.png';
import cardiologyIcon from 'assets/icons/medical-subjects/cardiology.png';
import laboratoryMedicineIcon from 'assets/icons/medical-subjects/laboratory-medicine.png';
import infectionMedicineIcon from 'assets/icons/medical-subjects/infection-medicine.png';
import endocrineMedicineIcon from 'assets/icons/medical-subjects/endocrine-medicine.png';
import anesthesiologyIcon from 'assets/icons/medical-subjects/anesthesiology.png';
import radiationOncologyIcon from 'assets/icons/medical-subjects/radiation-oncology.png';
import thoracicSurgeryIcon from 'assets/icons/medical-subjects/thoracic-surgery.png';
import pathologyIcon from 'assets/icons/medical-subjects/pathology.png';
import nuclearMedicineIcon from 'assets/icons/medical-subjects/nuclear-medicine.png';
import plasticSurgeryIcon from 'assets/icons/medical-subjects/plastic-surgery.png';
import hematoOncologyIcon from 'assets/icons/medical-subjects/hemato-oncology.png';
import pulmonologyIcon from 'assets/icons/medical-subjects/pulmonology.png';
import neurologyIcon from 'assets/icons/medical-subjects/neurology.png';
import neurosurgeryIcon from 'assets/icons/medical-subjects/neurosurgery.png';
import nephrologyIcon from 'assets/icons/medical-subjects/nephrology.png';
import radiologyIcon from 'assets/icons/medical-subjects/radiology.png';

export const SYMPTOM = {
    '감기': {
        NAME: 'flu',
        DEPARTMENT: ['내과', '이비인후과'],
        ICON: fluIcon
    },
    '두통': {
        NAME: 'headache',
        DEPARTMENT: ['내과', '이비인후과'],
        ICON: headacheIcon
    },
    '고열/미열': {
        NAME: 'highFever',
        DEPARTMENT: ['내과', '이비인후과'],
        ICON: highFeverIcon
    },
    '복통': {
        NAME: 'stomachache',
        DEPARTMENT: ['내과'],
        ICON: stomachacheIcon
    },
    '소화불량': {
        NAME: 'indigestion',
        DEPARTMENT: ['내과'],
        ICON: indigestionIcon
    },
    '몸살': {
        NAME: 'ache',
        DEPARTMENT: ['내과', '이비인후과'],
        ICON: acheIcon
    },
    '오한': {
        NAME: 'chill',
        DEPARTMENT: ['내과', '이비인후과'],
        ICON: chillIcon
    },
    '변비': {
        NAME: 'constipation',
        DEPARTMENT: ['내과'],
        ICON: constipationIcon
    },
    '설사': {
        NAME: 'diarrhea',
        DEPARTMENT: ['내과'],
        ICON: diarrheaIcon
    },
    '속쓰림': {
        NAME: 'heartburn',
        DEPARTMENT: ['내과'],
        ICON: heartburnIcon
    },
    '근육통': {
        NAME: 'muscularPain',
        DEPARTMENT: ['내과', '정형외과'],
        ICON: muscularPainIcon
    },
    '관절통': {
        NAME: 'arthralgia',
        DEPARTMENT: ['정형외과'],
        ICON: arthralgiaIcon
    },
}

export const DEPARTMENT = {
    '내과': {
        NAME: 'internalMedicine',
        ICON: internalMedicineIcon
    },
    '이비인후과': {
        NAME: 'otolaryngology',
        ICON: otolaryngologyIcon
    },
    '외과': {
        NAME: 'surgery',
        ICON: surgeryIcon
    },
    '치과': {
        NAME: 'dentistry',
        ICON: dentistryIcon
    },
    '소아청소년과': {
        NAME: 'pediatry',
        ICON: pediatryIcon
    },
    '산부인과': {
        NAME: 'gynecology',
        ICON: gynecologyIcon
    },
    '피부과': {
        NAME: 'dermatology',
        ICON: dermatologyIcon
    },
    '안과': {
        NAME: 'ophthalmology',
        ICON: ophthalmologyIcon
    },
    '응급의학과': {
        NAME: 'emergencyMedicine',
        ICON: emergencyMedicineIcon
    },
    '가정의학과': {
        NAME: 'familyMedicine',
        ICON: familyMedicineIcon
    },
    '비뇨기과': {
        NAME: 'urology',
        ICON: urologyIcon
    },
    '정신건강의학과': {
        NAME: 'psychiatry',
        ICON: psychiatryIcon
    },
    '정형외과': {
        NAME: 'orthopedics',
        ICON: orthopedicsIcon
    },
    '재활의학과': {
        NAME: 'rehabilitationMedicine',
        ICON: rehabilitationMedicineIcon
    },
    '류마티스과': {
        NAME: 'rheumatism',
        ICON: rheumatismIcon
    },
    '심장내과': {
        NAME: 'cardiology',
        ICON: cardiologyIcon
    },
    '진단검사의학과': {
        NAME: 'laboratoryMedicine',
        ICON: laboratoryMedicineIcon
    },
    '감염내과': {
        NAME: 'infectionMedicine',
        ICON: infectionMedicineIcon
    },
    '내분비과': {
        NAME: 'endocrineMedicine',
        ICON: endocrineMedicineIcon
    },
    '마취통증의학과': {
        NAME: 'anesthesiology',
        ICON: anesthesiologyIcon
    },
    '방사선종양학과': {
        NAME: 'radiationOncology',
        ICON: radiationOncologyIcon
    },
    '흉부외과': {
        NAME: 'thoracicSurgery',
        ICON: thoracicSurgeryIcon
    },
    '병리과': {
        NAME: 'pathology',
        ICON: pathologyIcon
    },
    '핵의학과': {
        NAME: 'nuclearMedicine',
        ICON: nuclearMedicineIcon
    },
    '성형외과': {
        NAME: 'plasticSurgery',
        ICON: plasticSurgeryIcon
    },
    '혈액종양내과': {
        NAME: 'hematoOncology',
        ICON: hematoOncologyIcon
    },
    '호흡기내과': {
        NAME: 'pulmonology',
        ICON: pulmonologyIcon
    },
    '신경과': {
        NAME: 'neurology',
        ICON: neurologyIcon
    },
    '신경외과': {
        NAME: 'neurosurgery',
        ICON: neurosurgeryIcon
    },
    '신장내과': {
        NAME: 'nephrology',
        ICON: nephrologyIcon
    },
    '영상의학과': {
        NAME: 'radiology',
        ICON: radiologyIcon
    },
}