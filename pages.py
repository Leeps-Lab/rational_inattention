from otree.api import Currency as c, currency_range
from ._builtin import Page, WaitPage
from .models import Constants
from .models import Group
from .models import parse_config


class MainPage(Page):
    form_model = 'player'
    form_fields = ['precision', 'buy_price', 'sell_price']

    def is_displayed(self):
        return self.subsession.config is not None

    def vars_for_template(self):
        """
        groups = self.subsession.get_groups()
        for group in groups:
            decisions = group.get_group_decisions_events()
            print("DECISIONS", decisions)
        """
        return {
            'round_num': self.round_number,
            # 'endowment': 100,
            'g': self.subsession.g,
            'm': self.subsession.m,
            'y': self.subsession.y,
            'q': self.subsession.q,
            'step': self.subsession.step,
            'finish': self.subsession.finish,
        }

class ResultsWaitPage(WaitPage):
    pass


class Results(Page):
    def vars_for_template(self):
            groups = self.subsession.get_groups()
            print('pages groups', groups)
            for group in groups:
                decisions = group.get_group_decisions_events()
                print("DECISIONS", decisions)

page_sequence = [MainPage, Results]
