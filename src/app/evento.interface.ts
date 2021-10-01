export interface Evento {
    
    id: number;
    codigoNome: string;
    responsavel: string;
    statusConfiguracao: {
        idStatus: number;
        nomeStatus: string;
    },
    ultimaAtualizacao: string;
    informacoes: {
        nmEvento: string;
        nmSolicitante: string;
        nuUnidadeOrganizacional: number;
        nmUnidadeOrganizacional: string;
        nmResponsavelEvento: string;
        tpPublico: string;
        nmTipoPublico:string;
        tpModalidadeEvento: string;
        nmModalidadeEvento: string;
        tpTipoComercializacao: any;
        nmTipoComercializacao: string;
        dtEvento: string;
        nuDuracaoEvento: number;
        nuParticipantes: number;
        nuTempoFalaParticipante: number;
        nuSalas: number;
        nuSessoes: number; 
    }
}
