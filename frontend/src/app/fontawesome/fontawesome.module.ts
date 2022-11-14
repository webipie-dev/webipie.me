import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngular, faDiscord, faDribbble, faFacebook, faFacebookF, faGithub, faGoogle, faHtml5, faInstagram, faLinkedinIn, faPinterest, faReact, faSlack, faTwitter, faVuejs, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faAddressCard, faAlignCenter, faAngleDown, faAngleLeft, faAngleRight,
  faAngleUp, faArrowAltCircleLeft, faArrowDown, faArrowLeft, faArrowRight, faArrowsAlt, faArrowsAltH, faArrowUp, faAssistiveListeningSystems, faAsterisk, faAward, faBalanceScale, faBars, faBell, faBirthdayCake, faBolt, faBomb, faBook, faBuilding, faBusAlt, faCalendarAlt, faCalendarCheck, faCameraRetro, faCarBattery, faCaretRight, faChartBar, faCheck, faCheckCircle, faChevronDown, faChevronLeft, faChevronRight,
  faChevronUp, faClock, faCog, faCommentDots, faCommentMedical, faComments, faCubes, faDirections, faDoorOpen, faDotCircle, faDownload, faEllipsisH, faEllipsisV, faEnvelope, faExclamation, faExclamationCircle, faExternalLinkAlt, faEye, faEyeDropper, faFileAlt, faFileArchive, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFileVideo,
  faFileWord, faFilm, faFolder, faFolderOpen, faGavel, faGem, faGraduationCap, faHandshake, faHandsHelping, faHourglass, faHourglassStart, faImages, faInfoCircle, faKeyboard, faLemon, faLifeRing, faLightbulb, faLink, faMap, faMapMarkerAlt, faNetworkWired, faObjectGroup, faPager, faPaperPlane, faPlayCircle, faPlus, faPlusCircle, faPoll, faPrint, faProjectDiagram, faPuzzlePiece, faQuestionCircle, faQuoteRight, faRandom, faReply, faSave, faSearch, faShapes, faShareSquare, faSignOutAlt, faSitemap, faSlidersH, faStar, faStarHalfAlt, faStopwatch, faSync, faTable, faTachometerAlt, faTasks, faThumbsUp, faTimes, faTimesCircle, faTrashAlt, faUnlockAlt, faUpload, faUser,
  faUserCircle, faUserClock, faUserGraduate,
  faUserLock, faUsers, faUserShield, faWrench
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [FontAwesomeModule]
})
export class FontawesomeModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF, faCalendarCheck, faAsterisk, faCheck, faCheckCircle, faArrowAltCircleLeft, faExclamation, faExclamationCircle, faStopwatch, faBell, faLinkedinIn, faCalendarAlt, faFacebook, faPrint, faAlignCenter, faMapMarkerAlt, faTachometerAlt, faExternalLinkAlt, faShareSquare, faSitemap, faInfoCircle, faLifeRing, faTwitter, faQuoteRight, faStarHalfAlt, faSync, faShapes, faCarBattery, faTable, faCubes, faPager, faAngular, faVuejs, faReact, faHtml5, faCheckCircle, faTimesCircle, faBomb, faNetworkWired, faBusAlt, faBirthdayCake, faEyeDropper, faThumbsUp, faCameraRetro, faUnlockAlt, faDownload, faUpload, faReply, faGoogle, faFileImage, faFolderOpen, faBars, faTrashAlt, faSave, faPlayCircle, faEllipsisV, faEllipsisH, faSlidersH, faFileArchive, faAward, faCaretRight, faInstagram, faPinterest, faYoutube, faDiscord, faSlack, faDribbble, faGithub, faPlus, faFolder, faTimes, faEnvelope, faAddressCard, faMap, faCalendarAlt, faImages, faFilm, faClock, faSearch, faChevronRight, faChevronUp, faChevronLeft, faChevronDown, faLink, faLightbulb, faGem, faCog, faDotCircle, faArrowsAltH, faComments, faCommentDots, faKeyboard, faObjectGroup, faUser, faUserCircle, faQuestionCircle, faBuilding, faBell, faFileExcel, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFileCode, faFileAlt, faEye, faChartBar, faPlusCircle, faAngleRight, faAngleUp, faAngleLeft, faAngleDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faStar, faSignOutAlt, faLemon, faUser, faKeyboard, faEye, faChartBar, faComments, faUsers, faLightbulb, faPuzzlePiece, faHourglassStart, faHandsHelping, faBolt, faBalanceScale, faHandshake, faCommentMedical, faGraduationCap, faUserShield, faAssistiveListeningSystems, faHourglass, faPoll, faPaperPlane, faArrowsAlt, faTasks, faBook, faClock, faDoorOpen, faWrench, faDirections, faRandom, faUserGraduate, faUserLock, faGavel, faProjectDiagram, faUserClock);
  }
}
